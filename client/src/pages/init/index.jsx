/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import io from 'socket.io-client';
import { useAppContext } from "../../providers/AppContext";

export default function Init() {
  const { setUser, setSocket, socket } = useAppContext();
  const navigate = useNavigate();
  const usernameRef = useRef();

  useEffect(() => {
    let mounted = true;
    if(mounted && socket) {
      socket.disconnect();
      setSocket(null);
    }
    return () => mounted = false;
  }, []);
  
  
  const onSubmit = (event) => {
    event.preventDefault();
    let username = usernameRef.current.value;
    if(!username.trim()) return;
    
    const socket = io.connect(import.meta.env.VITE_API_URL || 'http://localhost:3001');
    socket.emit('set_username', username);
    setSocket(socket);

    socket.on('connect', () => {
      setUser({ id: socket.id, username: username });
      navigate('/room');
    });
  }
  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '1.5rem' }}>
        <input
          type="text"
          name="username"
          placeholder='seu nome'
          ref={usernameRef}
          style={{ height: 24 }}
        />
        <button type="submit">Entrar no sorteio</button>
      </div>
    </form>
  )
}
