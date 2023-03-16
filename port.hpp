#ifndef PORT_HPP
#define PORT_HPP
#include "space.hpp"
#include "coordinate.hpp"
#include <vector>
#include <utility>
#include <list>

enum CraneState {SHIP, BUFFER, TRUCKBAY};

/// @brief Abstract class of Port which shares similar properties for both transfer
/// and balance
/// @return 
class Port{
    // cost defined as minutes i.e. Manhattan Distance
    protected:
    /// @brief describes the move done; only to be modified in tryAllOperators
    std::string moveDescription;
    Coordinate cranePosition;
    char craneState;
    /// @brief the number of minutes it took to reach this Port i.e. g(n)
    int costToGetHere;
    /// @brief The lower bound number of minutes it has taken and will take for the Port to
    /// finish
    int aStarCost;
    Space ship;
    Space buffer;
    public:
    Port();
    Port(const Coordinate& shipSize, const Coordinate& bufferSize);
    virtual int toHashIndex() const = 0;
    virtual bool operator==(const Port& rhs) const;
    const bool operator<(const Port& rhs) const;
    virtual std::list<Port*>& tryAllOperators() const = 0;
    void calculateAStar();
    const std::string& getMoveDescription() const;

    protected:
    virtual int calculateHeuristic() const = 0;
    int calculateManhattanDistance(const ContainerCoordinate& start, const ContainerCoordinate& end, 
        const char startSpace, const char endSpace) const;
};

/// @brief For transfer operations of the abstract Port class
class Transfer: public Port{
    private:
    std::vector<std::pair<ContainerCoordinate, Container*>> toOffload;
    std::vector<std::pair<ContainerCoordinate, Container*>> toLoad;
    std::vector<std::pair<ContainerCoordinate, Container*>> toStay;
    public:
    Transfer(const Coordinate& shipSize, 
        const Coordinate& bufferSize, 
        const std::vector<std::pair<Cell, Coordinate>>& shipLoad, 
        std::vector<Container*>& toLoad);
    int toHashIndex() const;
    std::list<Port*>& tryAllOperators() const;
    private:
    int calculateHeuristic() const;
    
};
#endif