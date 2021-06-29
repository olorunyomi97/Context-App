import React, { useState } from 'react';
import uuid from 'uuid/v1';

const SongList = () => {
    const [songs, setSongs] = useState([
        {title: 'almost home', id: 1},
        {title: 'bitches and bottles', id: 2},
        {title: 'hallelujah', id: 3},
        {title: '95 south', id: 4}
    ]);
    const addSong = () => {
        setSongs([...songs, { title: 'Long as my bitches love me', id: uuid()}])
    }
    return ( 
        <div className="song-list">
           <ul>
               {songs.map(song => {
                   return (<li key={song.id}>{song.title}</li>);
               })}
           </ul>
           <button onClick={addSong}>Add</button>
        </div>
     );
}
 
export default SongList;