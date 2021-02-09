import {useEffect, useState} from 'react'
import {Websocket} from 'react-websocket'


export default function Follow(){
  useEffect(()=>{

    setSocket(new WebSocket('ws://127.0.0.1:8000/ws/notify/'+JSON.parse(localStorage.getItem('profile')).id+'/'+JSON.parse(localStorage.getItem('token'))+'/'))
    getProfile()
  },[])


}
