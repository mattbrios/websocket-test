/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useAppContext } from "../../providers/AppContext";
import io from 'socket.io-client';

export default function Admin() {
  const { socket, setSocket } = useAppContext();
  const [ usersOnline, setUsersOnline ] = useState([]);
  const [ winner, setWinner ] = useState({});
  let pageLoaded = false;

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      if(!socket && !pageLoaded) {
        pageLoaded = true; //RTA para entrar somente uma vez na função ao carregar a página;

        const mySocket = io.connect(import.meta.env.VITE_API_URL || 'http://localhost:3001');
        setSocket(mySocket);
        mySocket.emit('get_participants');
      }
    }
    return () => mounted = false;
  }, []);

  useEffect(() => {
    let mounted = true;
    if(mounted && socket) {
      socket.on('update_participants', data => {
        setUsersOnline(data);
      });
      socket.on('get_winner', wsWinner => {
        setWinner(wsWinner);
      });
    }
    return () => {
      if(socket) {
        socket.off('update_participants');
        socket.off('get_winner');
      }
      mounted = false;
    }
  }, [socket]);

  const handleDraw = () => {
    socket.emit('draw');
  }
  
  return (
    <div>
      <p>Hello, admin</p>
      {usersOnline.length === 0 ? (
        <h3>Nenhum usuário online</h3>
      ):(
        <h3>Você possui {usersOnline.length} usuário{usersOnline.length != 1 ? 's' : ''} online!</h3>
      )}
      <button disabled={usersOnline.length === 0} onClick={handleDraw}>Realizar sorteio</button>
      {Object.keys(winner).length > 0 && (
        <div className="listUsers">
          <p className="caption">Vencedor(a):</p>
          <hr />
          <div>
            <p className="caption">username:</p>
            <h4>{winner.username}</h4>
            <p className="caption">socket id:</p>
            <h4>{winner.id}</h4>
          </div>
        </div>
      )}
      {usersOnline.length > 0 && (
        <div className="listUsers">
          <p className="caption">Lista de usuários online:</p>
          <hr />
          <ul>
            {usersOnline.map( (user, index) => (
              <li key={`user${index}`} className={user.id === winner?.id ? 'winner' : ''}>{user.username}</li>
            ) )}
          </ul>
        </div>
      )}
    </div>
  )
}
