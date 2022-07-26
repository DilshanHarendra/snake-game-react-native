import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions, Button} from 'react-native';
import tw from 'twrnc';
import {Cell} from '../shared/Cell';

function Player() {
  const [isPortrait, setIsPortrait] = useState(true);
  const [direction, setDirection] = useState('R');
  const [snake, setSnake] = useState([]);
  const [isStart, setIsStart] = useState(false);

  const mapRemToPx = 4;
  const moveBy = 4;
  const canvas = {width: 20, height: 20};

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      setIsPortrait(width < height);
    });
  }, []);

  useEffect(() => {
    if (isStart) {
      initGame();
    } else {
      setSnake([]);
    }

    return () => clearInterval(window.interval);
  }, [isStart]);

  function initGame() {
    // create cells
    const cell1 = new Cell(4, 4, 'bg-red-600', 20, 20);
    const cell2 = new Cell(4, 4, 'bg-blue-200', 24, 20);
    const cell3 = new Cell(4, 4, 'bg-yellow-200', 28, 20);
    const cell4 = new Cell(4, 4, 'bg-pink-200', 32, 20);
    setSnake([cell1, cell2, cell3, cell4]);
    run();
  }
  useEffect(() => {
    clearInterval(window.interval);
    run();
  }, [direction]);

  function run() {
    if (snake.length == 0) {
      return;
    }
    const canvasLength = canvas.width * mapRemToPx - snake[0].width;

    window.interval = setInterval(() => {
      let cells = [...snake];
      for (var i = cells.length - 1; i > 0; i--) {
        cells[i].setX(snake[i - 1].x);
        cells[i].setY(snake[i - 1].y);
      }

      if (direction == 'R') {
        if (cells[0].x < canvasLength) {
          let x = cells[0].x + moveBy;
          cells[0].setX(x);
        } else {
          cells[0].setX(0);
        }
      } else if (direction == 'L') {
        if (cells[0].x > 0) {
          let x = cells[0].x - moveBy;
          cells[0].setX(x);
        } else {
          cells[0].setX(canvasLength);
        }
      } else if (direction == 'D') {
        if (cells[0].y < canvasLength) {
          let y = cells[0].y + moveBy;
          cells[0].setY(y);
        } else {
          cells[0].setY(0);
        }
      } else if (direction == 'U') {
        if (cells[0].y > 0) {
          let y = cells[0].y - moveBy;
          cells[0].setY(y);
        } else {
          cells[0].setY(canvasLength);
        }
      }
      setSnake(cells);
    }, 200);
  }

  function changeDirection(d) {
    if (d === 'L') {
      if (direction != 'R') {
        setDirection(d);
      }
    } else if (d === 'R') {
      if (direction != 'L') {
        setDirection(d);
      }
    } else if (d === 'U') {
      if (direction != 'D') {
        setDirection(d);
      }
    } else if (d === 'D') {
      if (direction != 'U') {
        setDirection(d);
      }
    }
  }

  return (
    <View style={tw`p-2`}>
      <Text style={tw`text-center font-semibold text-2xl my-3`}>
        Score {direction}
      </Text>
      <Button title={'Start'} onPress={() => setIsStart(!isStart)} />
      <View style={tw`flex-row`}>
        {!isPortrait && (
          <View style={tw`w-20 h-full`}>
            <Button title={'Left'} style={tw`bg-blue-500 text-white`} />
            <Button title={'Right'} style={tw`bg-blue-500 text-white`} />
          </View>
        )}
        <View
          style={tw`bg-green-600 w-80 mx-auto ${
            isPortrait ? 'h-80' : 'h-72'
          } relative`}>
          {snake.map((cell, index) => (
            <View
              key={index}
              style={tw`w-${cell.width} h-${cell.height} ${cell.color} p-0 m-0 absolute top-${cell.y} left-${cell.x}`}
            />
          ))}
        </View>
        {!isPortrait && (
          <View>
            <Button title={'Left'} style={tw`bg-blue-500 text-white`} />

            <Button title={'Right'} style={tw`bg-blue-500 text-white`} />
          </View>
        )}
      </View>
      {isPortrait && (
        <View style={tw`mt-10`}>
          <Button
            title={'Up'}
            onPress={() => changeDirection('U')}
            style={tw`bg-blue-500 text-white`}
          />
          <View style={tw`flex-row`}>
            <View style={{flex: 1}}>
              <Button
                title={'Left'}
                onPress={() => changeDirection('L')}
                style={tw`bg-blue-500 text-white`}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                title={'Right'}
                onPress={() => changeDirection('R')}
                style={tw`bg-blue-500 text-white`}
              />
            </View>
          </View>
          <Button
            title={'Down'}
            onPress={() => changeDirection('D')}
            style={tw`bg-blue-500 text-white`}
          />
        </View>
      )}
    </View>
  );
}

export default Player;
