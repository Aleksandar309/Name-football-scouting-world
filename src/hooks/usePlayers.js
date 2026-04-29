import { useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export function usePlayers() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'players'), orderBy('addedDate', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setPlayers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [])

  const addPlayer = (data) => addDoc(collection(db, 'players'), {
    ...data,
    addedDate: new Date().toISOString().split('T')[0]
  })

  const updatePlayer = (id, data) => updateDoc(doc(db, 'players', id), data)

  const deletePlayer = (id) => deleteDoc(doc(db, 'players', id))

  return { players, loading, addPlayer, updatePlayer, deletePlayer }
}
