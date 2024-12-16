import home_icon from './home.png'
import browse_icon from './search.png'
import stack_icon from './stack.png'
import shuffle_icon from './shuffle.png'
import play_icon from './play.png'
import prev_icon from './prev.png'
import next_icon from './next.png'
import loop_icon from './loop.png'
import arrow_left from './left_arrow.png'
import arrow_right from './right_arrow.png'
import clock_icon from './clock_icon.png'
import pause_icon from './pause.png'
import img15 from './img15.jpg'
import img16 from './img16.jpg'
import img11 from './img11.jpg'
import img12 from './img12.jpg'
import img8 from './img8.jpg'
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import AM from './AM.jpg'
import song1 from './song1.mp3'
import song2 from './song2.mp3'
import song3 from './song3.mp3'
import song4 from './song4.mp3'
import song5 from './song5.mp3'


export const assets = {
    
    home_icon,
    browse_icon,
    stack_icon,
    shuffle_icon,
    play_icon,
    prev_icon,
    next_icon,
    loop_icon,
    arrow_left,
    arrow_right,
    clock_icon,
    pause_icon,
    
}

export const albumsData =[
    {
      id:0,
      name: "Top Favorites",
      image:img15,
      desc: "Your weekly update of the most played tracks",
      bgColor:"#d9d073",
    },
    {
      id:1,
      name: "Top Songs Global",
      image: img16,
      desc:"Your weekly update of the most played tracks",
      bgColor:"#b05dd4" 
    },
    {
      id:2,
      name: "Viral Hits",
      image: img11,
      desc:"Your weekly update of the most played tracks",
      bgColor:"#1a1f36" 
    },
    {
      id:3,
      name: "Top 50 India",
      image: img12,
      desc:"Your weekly update of the most played tracks",
      bgColor:"#22543d" 
    },
    {
      id:4,
      name: "Top 50 Global",
      image: img8,
      desc:"Your weekly update of the most played tracks",
      bgColor:"#2a4365" 
    },
    {
    id:5,
    name: "AM",
    image: AM,
    desc:"2013-Album",
    bgColor:"#2a4375" 
    }
    
  ]

  export const songsData = [
    {
      id:9,
      name: "Song One",
      image: img1,
      file:song1,
      desc:"Put a smile on your face with these happy tunes.",
      duration: "4:13"
    },
    {
      id:1,
      name: "Song Two",
      image: img2,
      file:song2,
      desc:"Put a smile on your face with these happy tunes.",
      duration: "4:32"
    },
    {
      id:2,
      name: "Song Three",
      image: img3,
      file:song3,
      desc:"Put a smile on your face with these happy tunes.",
      duration: "3:04"
    },
    {
      id:3,
      name: "Song Four",
      image: img4,
      file:song4,
      desc:"Put a smile on your face with these happy tunes.",
      duration: "2:41"
    },
    {
      id:4,
      name: "Song Five",
      image: img5,
      file:song5,
      desc:"Put a smile on your face with these happy tunes.",
      duration: "4:21"
    }
  ]