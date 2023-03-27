#space is representaive of the entire ship + buffer
#basically the whole frame
from container import Container
from cell import Cell
from enum import Enum
import copy
from cell import Condition


##did not add the assignment and noteq functions at end. are they necessary?

class Space:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.cells = [[Cell() for j in range(height)] for i in range(width)]
        self.stackHeights = [0] * width
        print( "* msg: Space init() was called")

        for i in range(width):
            self.stackHeights[i] = 0
            self.cells[i][0] = Cell(state = "UNOCCUPIABLE")

    def getCell(self, col, row):
        return self.cells[col][row]

    def getCellState(self, col, row):
        return self.cells[col][row].getState()

    def setAsHull(self,col,row):
        #Sets a cell like with a ship as a hull thus limiting stack height
        self.increaseStackHeight(col, row)
        self.cells[col][row].setState("HULL")

    def setAsOccupied(self, col, row, container):
        self.increaseStackHeight(col, row)
        self.cells[col][row].setState("OCCUPIED")
        self.cells[col][row].setContainer(container)

    def addContainer(self, col, row, container):
        if self.cells[col][row].getState() != "EMPTY":
            print("msg: addContainer(empty) was called")
            print("Cant put a container there, already ")
            raise Exception(10)
        
        elif self.cells[col][row].getState() == "EMPTY":
                self.cells[col][row].setState("OCCUPIED")
                self.cells[col][row].setContainer(container)
                self.increaseStackHeight(col, row)
                print("msg: addContainer() was called")

    def removeContainer(self, col, row):
        if self.cells[col][row].getState() != "OCCUPIED":
            raise Exception(9)
        self.cells[col][row].setState("EMPTY")
        self.stackHeights[col] = self.stackHeights[col] - 1

    def getStackHeight(self, col):
        #Gets the height of the stack at a certain column. No bounds checking
        return self.stackHeights[col]

    def increaseStackHeight(self, col, row):
        self.stackHeights[col] = self.stackHeights[col] + 1

    def getTopPhysicalCell(self, col):
        #Gets the top-most non-EMPTY cell
        if self.stackHeights[col] == 0:
            return Cell(Cell.State.EMPTY)  # no physical cell
        else:
            # TODO Make sure this logic is correct
            return self.cells[col][self.height - self.stackHeights[col] - 1]

    def getWidth(self):
        return self.width

    def getHeight(self):
        return self.height

    def __del__(self):
        self.stackHeights.clear()
        self.cells.clear()

    def __copy__(self):
        return Space(self.width, self.height)
