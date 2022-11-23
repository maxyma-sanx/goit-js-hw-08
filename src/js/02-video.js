import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

let setTime;
const currentTime = localStorage.getItem(PLAYER_CURRENT_TIME);

function checkCurrentTime(time) {
  time ? (setTime = currentTime) : (setTime = 0);
}

function onTimeUpdate(data) {
  localStorage.setItem(PLAYER_CURRENT_TIME, data.seconds);
}

window.addEventListener('load', checkCurrentTime(currentTime));
player.on('timeupdate', throttle(onTimeUpdate, 1000));
player.setCurrentTime(setTime);
