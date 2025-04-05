import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const useCollection = (collectionName: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const user = auth().currentUser;
      try {
        const snapshot = await firestore().collection(collectionName);
        const userDoc = snapshot.doc(user?.uid);
        const userDocRef = await userDoc.get();
        setData(userDocRef.data() as any);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [collectionName]);

  return { data, isLoading, error };
};
