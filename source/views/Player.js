import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions, Button} from 'react-native';
import tw from 'twrnc';
import {Cell} from '../shared/Cell';
import UserAvatar from 'react-native-user-avatar';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-native';
import {setUserScore} from '../store/actions/userAction';
import IconButton from '../components/IconButton';

function Player() {
  const [isPortrait, setIsPortrait] = useState(true);
  const [direction, setDirection] = useState('R');
  const [snake, setSnake] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [isStartRun, setIsStartRun] = useState(false);
  const [food, setFood] = useState(undefined);
  const [score, setScore] = useState(0);
  const user = useSelector(state => state.users.currentUser);
  let navigate = useNavigate();

  const mapRemToPx = 4;
  const moveBy = 4;
  const speed = 500; // timer
  const canvas = {
    width: 20,
    height: 20,
    canvasLength: 20 * mapRemToPx - 4, // canvas length
  };

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      setIsPortrait(width < height);
    });
  }, []);

  useEffect(() => {
    if (isStart) {
      initGame();
    } else {
      reset();
    }

    return () => clearInterval(window.interval);
  }, [isStart]);

  useEffect(() => {
    clearInterval(window.interval);
    run();
  }, [direction]);

  useEffect(() => {
    eat();
    if (!isStartRun && snake.length > 0) {
      setIsStartRun(true);
      run();
    }
  }, [snake]);

  function initGame() {
    clearInterval(window.interval);
    setScore(0);

    // create cells
    const cell1 = new Cell(4, 4, 'bg-yellow-600', 20, 20); // snake head yellow-600
    const cell2 = new Cell(4, 4, 'bg-yellow-500', 24, 20); // snake body
    const cell3 = new Cell(4, 4, 'bg-yellow-500', 28, 20);

    setSnake([cell1, cell2, cell3]);
    makeFood();
  }

  function run() {
    if (snake.length == 0) {
      return;
    }
    const canvasLength = canvas.canvasLength;

    window.interval = setInterval(() => {
      let cells = [...snake];
      // copy cell data
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
    }, speed);
  }

  function changeDirection(d) {
    if (d === 'L' && direction != 'R') {
      setDirection(d);
    } else if (d === 'R' && direction != 'L') {
      setDirection(d);
    } else if (d === 'U' && direction != 'D') {
      setDirection(d);
    } else if (d === 'D' && direction != 'U') {
      setDirection(d);
    }
  }

  function makeFood() {
    var fdx =
      Math.floor(Math.random() * (canvas.canvasLength / mapRemToPx) + 1) *
      mapRemToPx;
    var fdy =
      Math.floor(Math.random() * (canvas.canvasLength / mapRemToPx) + 1) *
      mapRemToPx;

    if (snake.length > 0) {
      // check whether the food is on snake
      for (var i = 0; i < snake.length; i++) {
        if (snake[i].x == fdx && snake[i].y == fdy) {
          makeFood();
        } else {
          setFood({
            x: fdx,
            y: fdy,
          });
        }
      }
    } else {
      setFood({
        x: fdx,
        y: fdy,
      });
    }
  }

  function eat() {
    if (snake.length == 0 || !food) {
      return;
    }
    if (food.x == snake[0].x && food.y == snake[0].y) {
      makeFood();
      const cell = new Cell(
        4,
        4,
        'bg-yellow-500',
        snake[snake.length - 1].x,
        snake[snake.length - 1].y,
      );
      clearInterval(window.interval);
      let arr = [...snake, cell];
      setIsStartRun(false);
      setSnake(arr);
      let s = score + 5;
      setUserScore({...user, score: s});
      setScore(s);
    }
  }

  function reset() {
    clearInterval(window.interval);
    setScore(0);
    setFood(undefined);
    setSnake([]);
    setIsStartRun(false);
    setDirection('R');
  }

  return (
    <View style={tw`px-2`}>
      <View style={tw`my-5 flex-row justify-between items-center`}>
        <Button title={'Back'} onPress={() => navigate('/', {replace: true})} />
        <Text style={tw`font-semibold text-lg`}>{user.name}</Text>
        <View style={tw`w-10`}>
          <UserAvatar size={40} name={user.name} />
        </View>
      </View>

      <View style={tw`flex-row`}>
        {!isPortrait && (
          <View style={tw`w-24 h-full`}>
            <Text style={tw`text-center font-semibold text-2xl  mb-10`}>
              Score {score}
            </Text>
            <IconButton
              icon="arrow-up"
              style="mx-auto"
              onPress={() => changeDirection('U')}
            />
            <IconButton
              icon="arrow-down"
              style="mx-auto mt-8"
              onPress={() => changeDirection('D')}
            />
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
          {food && (
            <View
              style={tw`w-4 h-4 rounded-full bg-red-600 p-0 m-0 absolute top-${food.y} left-${food.x}`}
            />
          )}
        </View>
        {!isPortrait && (
          <View>
            <IconButton
              icon={isStart ? 'pause' : 'play'}
              onPress={() => setIsStart(!isStart)}
            />

            <View style={tw`flex-row justify-center mt-10`}>
              <IconButton
                icon="arrow-left"
                onPress={() => changeDirection('L')}
              />
              <IconButton
                icon="arrow-right"
                onPress={() => changeDirection('R')}
                style=" ml-4"
              />
            </View>
          </View>
        )}
      </View>
      {isPortrait && (
        <View style={tw`mt-10`}>
          <Text style={tw`text-center font-semibold text-2xl  mb-10`}>
            Score {score}
          </Text>
          <IconButton
            icon="arrow-up"
            style="mx-auto"
            onPress={() => changeDirection('U')}
          />
          <View style={tw`flex-row justify-center my-4`}>
            <IconButton
              icon="arrow-left"
              onPress={() => changeDirection('L')}
            />
            <IconButton
              icon={isStart ? 'pause' : 'play'}
              onPress={() => setIsStart(!isStart)}
              style=" mx-8"
            />
            <IconButton
              icon="arrow-right"
              onPress={() => changeDirection('R')}
            />
          </View>
          <IconButton
            icon="arrow-down"
            onPress={() => changeDirection('D')}
            style="mx-auto"
          />
        </View>
      )}
    </View>
  );
}

export default Player;
