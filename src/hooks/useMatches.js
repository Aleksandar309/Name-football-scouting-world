import { useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export function useMatches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'matches'), orderBy('uploadDate', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setMatches(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [])

  const addMatch = (data) => addDoc(collection(db, 'matches'), {
    ...data,
    uploadDate: new Date().toISOString().split('T')[0]
  })

  const updateMatch = (id, data) => updateDoc(doc(db, 'matches', id), data)

  const deleteMatch = (id) => deleteDoc(doc(db, 'matches', id))

  return { matches, loading, addMatch, updateMatch, deleteMatch }
}
