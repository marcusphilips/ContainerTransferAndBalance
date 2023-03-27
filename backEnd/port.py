from enum import Enum
from abc import ABC, abstractmethod
from space import Space

from coordinate import Coordinate
from coordinate import ContainerCoordinate
from cell import Cell
from container import Container

from typing import List
from typing import Tuple
from cell import Condition

import copy
class CraneState(Enum):
    SHIP = 1
    BUFFER = 2
    TRUCKBAY = 3

class Port(ABC):
    #shipSize => Coordinate
    #bufferSize => Coordinate
    def __init__(self, shipSize: Coordinate, bufferSize : Coordinate):
        print("Going to port constructor. ")
        # describes the move done; only to be modified in tryAllOperators
        self.moveDescription = ""
        # parent describes how the Port is derived from
        self.parent = None
        self.cranePosition = Coordinate(0, 0)
        self.craneState = "SHIP"
        # the number of minutes it took to reach this Port i.e. g(n)
        self.costToGetHere = 0
        # The lower bound number of minutes it has taken and will take for the Port to finish
        self.aStarCost = 0
        self.solved = False
        self.ship = Space(shipSize.x, shipSize.y)
        self.buffer = Space(bufferSize.x, bufferSize.y)
        print("Ship test: ", self.ship)

    def eq(self, rhs):
        if self.craneState != rhs.craneState:
            return False
        if self.cranePosition != rhs.cranePosition:
            return False
        # find the first thing that is unequal
        # go through the ship's space
        for row in range(self.ship.getHeight()):
            for col in range(self.ship.getWidth()):
                if rhs.ship.getCell(col, row).getState() != self.ship.getCell(col, row).getState():
                    return False
        # then the buffer's space room for optimization
        for row in range(self.buffer.getHeight()):
            for col in range(self.buffer.getWidth()):
                if rhs.buffer.getCell(col, row).getState() != self.buffer.getCell(col, row).getState():
                    return False
        return True

    def lessThan(self, rhs):
        return self.aStarCost < rhs.aStarCost

    def greaterThan(lhs, rhs):
        return lhs.aStarCost > rhs.aStarCost

    def calculateAStar(self):
        self.aStarCost = self.costToGetHere + self.calculateHeuristic()

    def getMoveDescription(self):
        return self.moveDescription

    def isSolved(self):
        return self.solved

    def calculateHeuristic(self):
        pass

    def calculateManhattanDistance(self, start, end, startSpace, endSpace):
        if startSpace == endSpace:
            # Are we in the buffer or ship?
            if startSpace == "BUFFER":
                currSpace = self.buffer
            else:
                currSpace = self.ship
            
            # Actually the most complicated to calculate
            toMoveX = start.x - end.x
            SPACE_HEIGHT = currSpace.getHeight()
            if toMoveX > 0:
                # Need to decrement x
                minDepth = start.y
                for x in range(start.x, end.x-1, -1):
                    minClearance = SPACE_HEIGHT - currSpace.getStackHeight(x)
                    if minDepth <= minClearance:
                        minDepth = minClearance
                return (start.y - minDepth) + toMoveX + (end.y - minDepth)
            elif toMoveX < 0:
                # Need to increment x
                minDepth = start.y
                for x in range(start.x, end.x+1):
                    minClearance = SPACE_HEIGHT - currSpace.getStackHeight(x)
                    if minDepth <= minClearance:
                        minDepth = minClearance
                return (start.y - minDepth) + (-toMoveX) + (end.y - minDepth)
            else:
                # Why are you trying to move within the same column?
                raise ValueError("Trying to move within the same column")
        # This is an "interspace" transfer so like moving between the buffer/ship/truckbay
        # Actually made easier since the crane always has to go up to 0,0 coordinate
        else:
            if startSpace == "TRUCKBAY" and endSpace == "TRUCKBAY":
                # Illogical move, throw error
                raise ValueError("Trying to move within the same truckbay")
            # Quite trivial
            if startSpace == "TRUCKBAY":
                return end.x + end.y + 2
            if endSpace == "TRUCKBAY":
                return start.x + start.y + 2
            # Only dealing with distance between ship and buffer also pretty trivial
            return start.x + start.y + end.x + end.y + 4


    def toStringFromState(state):
        if state == "SHIP":
            return "Ship"
        elif state == "BUFFER":
            return "Buffer"
        elif state == "TRUCKBAY":
            return "Truck Bay"
        else:
            raise ValueError("Invalid state")
        

    def tryAllOperators(self):
        CRANE_COLUMN = self.cranePosition.x
        acc = []
        
        if self.craneState == "SHIP":
            if self.cranePosition == Coordinate(0, 0):
                for i in range(self.ship.getWidth()):
                    if self.ship.getStackHeight(i) > 0 and self.ship.getTopPhysicalCell(i).getState() != "HULL" and i != CRANE_COLUMN:
                        NEW_COORD = Coordinate(i, self.ship.getHeight() - self.ship.getStackHeight(i) - 1)
                        acc.append(self.createDerivative(None, NEW_COORD, "SHIP"))
                if len(self.toLoad) != 0:
                    acc.append(self.createDerivative(None, Coordinate(0, 0), "TRUCKBAY"))
            else:
                if self.ship.getCell(self.cranePosition.x, self.cranePosition.y).getState() != "Occupied":
                    raise ValueError(5)
                toMove = self.ship.getCell(self.cranePosition.x, self.cranePosition.y).getContainer()
                if toMove.isToBeOffloaded():
                    acc.append(self.createDerivative(toMove, Coordinate(0, 0), "TRUCKBAY"))
                    return acc
                for i in range(self.ship.getWidth()):
                    if self.ship.getStackHeight(i) < self.ship.getHeight() - 1 and i != CRANE_COLUMN:
                        NEW_COORD = Coordinate(i, self.ship.getHeight() - self.ship.getStackHeight(i) - 1)
                        acc.append(self.createDerivative(toMove, NEW_COORD, "SHIP"))
                for i in range(self.buffer.getWidth()):
                    if self.buffer.getStackHeight(i) < self.buffer.getHeight() - 1:
                        NEW_COORD = Coordinate(i, self.buffer.getHeight() - self.buffer.getStackHeight(i) - 1)
                        acc.append(self.createDerivative(toMove, NEW_COORD, "BUFFER"))
                for i in range(self.ship.getWidth()):
                    if self.ship.getStackHeight(i) > 0 and self.ship.getTopPhysicalCell(i).getState() != "Hull" and i != CRANE_COLUMN:
                        NEW_COORD = Coordinate(i, self.ship.getHeight() - self.ship.getStackHeight(i) - 1)
                        acc.append(self.createDerivative(None, NEW_COORD, "SHIP"))
                for i in range(self.buffer.getWidth()):
                    if self.buffer.getStackHeight(i) > 0:
                        NEW_COORD = Coordinate(i, self.buffer.getHeight() - self.buffer.getStackHeight(i) - 1)
                        acc.append(self.createDerivative(None, NEW_COORD, "BUFFER"))
                if len(self.toLoad) != 0:
                    acc.append(self.createDerivative(None, Coordinate(0, 0), "TRUCKBAY"))
                    
        elif self.craneState == "BUFFER":
            if self.buffer.getCell(self.cranePosition.x, self.cranePosition.y).getState() != "Occupied":
                raise ValueError(5)
            toMove = self.buffer.getCell(self.cranePosition.x, self.cranePosition.y).getContainer()
            if toMove.isToBeOffloaded():
                acc.append(self.createDerivative(toMove, Coordinate(0, 0), "TRUCKBAY"))
                return acc
            for i in range(self.ship.getWidth()):
                if self.ship.getStackHeight(i) < self.ship.getHeight() - 1:
                    NEW_COORD = Coordinate(i, self.ship.getHeight() - self.ship.getStackHeight(i) - 1)
                    acc.append(self.createDerivative(toMove, NEW_COORD, "SHIP"))
            for i in range(self.buffer.getWidth()):
                if self.buffer.getStackHeight(i) > 0 and i != CRANE_COLUMN:
                    NEW_COORD = Coordinate(i, self.buffer.getHeight() - self.buffer.getStackHeight(i)-1)
                    acc.append(self.createDerivative(None, NEW_COORD, "BUFFER"))
            for i in range(self.ship.getWidth()):
                if self.ship.getStackHeight(i) > 0 and self.ship.getTopPhysicalCell(i).getState() != "HULL":
                # to create a new ContainerCoordinate in the ship
                    NEW_COORD = Coordinate(i, self.ship.getHeight() - self.ship.getStackHeight(i) - 1)
                    acc.append(self.createDerivative(None, NEW_COORD, "SHIP"))
            acc.append(self.createDerivative(None, NEW_COORD, "SHIP"))
        
        elif self.craneState == "TRUCKBAY":
            for i in range(self.buffer.get_width()):
                if self.buffer.get_stack_height(i) > 0:
                    new_coord = Coordinate(i, self.buffer.get_height() - self.buffer.get_stack_height(i) - 1)
                    acc.append(self.createDerivative(None, new_coord, self.BufferLocation()))

            for i in range(self.ship.get_width()):
                if self.ship.get_stack_height(i) > 0 and self.ship.get_top_physical_cell(i).get_state() != "HULL":
                    new_coord = Coordinate(i, self.ship.get_height() - self.ship.get_stack_height(i) - 1)
                    acc.append(self.createDerivative(None, new_coord, self.ShipLocation()))

            if len(self.toLoad):
                to_move = self.toLoad[-1][1]
                new_to_load = self.toLoad[:-1]
                for i in range(self.buffer.get_width()):
                    if self.buffer.get_stack_height(i) < self.buffer.get_height() - 1:
                        new_coord = Coordinate(i, self.buffer.get_height() - self.buffer.get_stack_height(i) - 1)
                        acc.append(self.create_derivative(to_move, new_coord, self.BufferLocation()))

                for i in range(self.ship.get_width()):
                    if self.ship.get_stack_height(i) < self.ship.get_height() - 1:
                        new_coord = Coordinate(i, self.ship.get_height() - self.ship.get_stack_height(i) - 1)
                        acc.append(self.create_derivative(to_move, new_coord, self.ShipLocation()))
        else:
            raise ValueError(5)
        return acc
                    
            
    def toStringBasic(self):
        pass


#class Transfer extends Port
class Transfer(Port):
    #shipload is a list of pairs that contain (Cell, Coordinate)
    #shipSize = Coordinate
    #bufferSize = Coordinate
    #toLoad = list of containers

    def __init__(self, shipSize : Coordinate, bufferSize : Coordinate, shipLoad : List[Tuple[Cell, Coordinate]], toLoad : List[Container]):
        Port.__init__(self, shipSize, bufferSize)
        
        self.toOffload = []
        self.toLoad = []
        self.toStay = []
        for i in range(len(shipLoad)):
            CO = shipLoad[i][1]
            #print("x ", CO.x, "y ", CO.y)
            #print("Checking load ", shipLoad[i][0])
            CELL = shipLoad[i][0]
            #print("Testing state output ", CELL.getState())
            
            if CELL.getState() == "HULL":
                print("Ship test2: ", self.ship)
                self.ship.setAsHull(CO.x, CO.y)
            elif CELL.getState() == "OCCUPIED":        
                self.ship.setAsOccupied(CO.x, CO.y, CELL.getContainer())
            else:
                raise Exception("Invalid state")
            if CELL.getState() == "OCCUPIED" and CELL.getContainer().isToBeOffloaded():
                containerToOffload = (ContainerCoordinate(CO.x, CO.y), CELL.getContainer())
                self.toOffload.append(containerToOffload)
            elif CELL.getState() == "OCCUPIED" and not CELL.getContainer().isToBeOffloaded():
                containerToStay = (ContainerCoordinate(CO.x, CO.y), CELL.getContainer())
                self.toStay.append(containerToStay)
        self.toLoad = [(ContainerCoordinate(-1, -1), c) for c in toLoad]
    
    
    def toStringBasic(self):
        pass  # implementation to be added
    
    def calculateHeuristic(self):
        # this is just the remaining number of containers that need to load. Will just
        # assume all containers can just phase through one another
        minutesToLoad = len(self.toLoad) * 2

        # this is the remaining number of containers that need to offload
        # thanks to how we defined the coordinate system the manhattan distance is
        # calculated the same for both the ship and buffer
        minutesToOffload = 0
        for p in self.toOffload:
            coord = p[0]
            minutesToOffload += 2 + coord.x + coord.y

        # for the edge case of having a container in the buffer that needs to be put
        # back onto the ship. If the container that needs to stay on the ship is already
        # on the ship, the heuristic for that will be 0
        minutesToMoveFromBufferToShip = 0
        for p in self.toStay:
            coord = p[0]
            if coord.isInBuffer:
                minutesToMoveFromBufferToShip += 4 + coord.x + coord.y

        # okay heuristic to be finetuned. Can certainly be better
        # TODO: finetune
        lowerBoundTimeLeft = minutesToLoad + minutesToOffload + minutesToMoveFromBufferToShip
        if lowerBoundTimeLeft == 0:
            self.solved = True
        return lowerBoundTimeLeft

    
    def moveContainerAndCrane(self, container, start, end, startSpace, endSpace):
        # just moving the crane
        if container is None:
            # another sanity check
            if endSpace == "SHIP":
                if self.ship.getCellState(end.x, end.y) != "OCCUPIED":
                    raise Exception(5)
            elif endSpace == "BUFFER":
                if self.buffer.getCellState(end.x, end.y) != "OCCUPIED":
                    raise Exception(5)
            self.cranePosition = end
            self.craneState = endSpace
            self.moveDescription += f"\nMoving crane only from {self.toStringFromState(startSpace)} {start.toString()} to {self.toStringFromState(endSpace)} {end.toString()}"
        # moving the crane and the container
        else:
            self.cranePosition = end
            self.craneState = endSpace
            # add container at end
            if endSpace == "BUFFER":
                self.buffer.addContainer(end.x, end.y, container)
            elif endSpace == "SHIP":
                self.ship.addContainer(end.x, end.y, container)
            self.updateContainerCoordinateVectors(container, end, endSpace)
            # remove container at beginning
            if startSpace == "BUFFER":
                self.buffer.removeContainer(start.x, start.y)
            elif startSpace == "SHIP":
                self.ship.removeContainer(start.x, start.y)
            self.moveDescription += f"\nMoving container {container.toString()} from {self.toStringFromState(startSpace)} {start.toString()} to {self.toStringFromState(endSpace)} {end.toString()}"

        
    
    def createDerivative(self, container : Container, end : Coordinate, end_space : str):
        # Create a copy of the current transfer state
        deriv = copy.deepcopy(self)
        deriv.parent = self.parent
        deriv.move_description = self.moveDescription
        
        # Calculate the manhattan distance between the crane's current position and the end position
        translation_move = self.calculateManhattanDistance(self.cranePosition, end, self.craneState, end_space)
        
        # Move the crane and container to the specified end coordinates and update the transfer state
        deriv.moveContainerAndCrane(container, self.cranePosition, end, self.craneState, end_space)
        
        # Update the cost to get to this new state and calculate the A* heuristic
        deriv.costToGetHere += translation_move
        deriv.calculate_a_star()
        
        # Return the new transfer state
        return deriv

    
    def updateContainerCoordinateVectors(self, container, newPosition, newSpace):
        if container.isToBeOffloaded():
            # search for toOffload
            for i, (coord, c) in enumerate(self.toOffload):
                if c == container:
                    # is the offloaded container now in the trucks?
                    if newSpace == "TRUCKBAY":
                        self.toOffload.pop(i)
                        return

                    new_coord = ContainerCoordinate(newPosition.x, newPosition.y)
                    new_coord.isInBuffer = (newSpace == "BUFFER")

                    self.toOffload[i] = (new_coord, container)
                    return
            # did not find the appropriate container, throw exception
            raise Exception("Could not find offloaded container")
        else:
            # search for toStay
            for i, (coord, c) in enumerate(self.toStay):
                if c == container:
                    new_coord = ContainerCoordinate(newPosition.x, newPosition.y)
                    new_coord.isInBuffer = (newSpace == "BUFFER")

                    self.toStay[i] = (new_coord, container)
                    return
            # did not find the new container, so will add to toStay
            # assuming it was properly pulled from
            new_coord = ContainerCoordinate(newPosition.x, newPosition.y)
            new_coord.isInBuffer = (newSpace == "BUFFER")
            toAdd = (new_coord, container)
            self.toStay.append(toAdd)







