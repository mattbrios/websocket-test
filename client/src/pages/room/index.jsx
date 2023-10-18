/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useAppContext } from '../../providers/AppContext'
import { useNavigate } from 'react-router-dom';

export default function Room() {
  const { user, socket } = useAppContext();
  const navigate = useNavigate();
  const [ status, setStatus ] = useState('not ready');
  const [ response, setResponse ] = useState('');
  let pageLoaded = false;

  useEffect(() => {
    let mounted = true;
    if(mounted && !pageLoaded){
      pageLoaded = true;
      if(!socket) {
        navigate('/');
      }
    }
    return () => mounted = false;
  },[]);

  useEffect(() => {
    let mounted = true;
    if(mounted && socket) {
      socket.on('get_winner', winner => {
        setStatus(winner.id === user.id);
      });
    }
    return () => {
      if(socket) {
        socket.off('get_winner');
      }
      mounted = false;
    }
  }, [socket])
  

  useEffect(() => {
    let mounted = true;
    if(mounted){
      switch (status) {
        case false:
          setResponse('Sinto muito, você não ganhou...');
          break;
        case true:
          setResponse('Parabéns, você ganhou');
          break;
        default:
          setResponse('Aguardando sorteio...');
      }
    }
  
    return () => mounted = false;
  }, [status]);

  return (
    <div>
      <p>Olá, {user?.username}</p>
      <div className={`statusContainer ${!status ? 'loser' : status === true ? 'winner' : ''}`}>
        <p className='caption'>status:</p>
        <p>{response}</p>
      </div>
    </div>
  )
}
