import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy,
    doc,
    where,
    getDoc,
    Timestamp
  } from 'firebase/firestore';
  import { auth } from '../firebase';
  
  export interface Discussion {
    id: string;
    title: string;
    content: string;
    lastMessages: string[];
    iconUrl: string;
    authorId: string;
    authorName: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    votes: number;
    commentCount: number;
  }
  
  export interface Comment {
    id?: string;
    discussionId: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }
  
  const db = getFirestore();
  
  export const discussionService = {
    // Create a new discussion
    async createDiscussion(title: string, content: string): Promise<string> {
      const user = auth.currentUser;
      if (!user) throw new Error('Must be logged in to create a discussion');
  
      const discussion: Omit<Discussion, 'id'> = {
        title,
        content,
        lastMessages: [],
        iconUrl: 'https://via.placeholder.com/150',
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        votes: 0,
        commentCount: 0
      };
  
      const docRef = await addDoc(collection(db, 'discussions'), discussion);
      return docRef.id;
    },
  
    // Get a single discussion by ID
    async getDiscussion(id: string): Promise<Discussion | null> {
      const docRef = doc(db, 'discussions', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) return null;
      return { 
        id: docSnap.id, 
        ...docSnap.data(),
        lastMessages: docSnap.data().lastMessages || [],
        iconUrl: docSnap.data().iconUrl || 'https://via.placeholder.com/150'
      } as Discussion;
    },
  
    // Get comments for a discussion
    async getComments(discussionId: string): Promise<Comment[]> {
      const q = query(
        collection(db, 'comments'),
        where('discussionId', '==', discussionId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Comment));
    }
  };