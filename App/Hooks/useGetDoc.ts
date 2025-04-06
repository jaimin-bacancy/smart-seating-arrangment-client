import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export const useGetDoc = (collection: string, id: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);
        const doc = await firestore().collection(collection).doc(id).get();
        if (!doc.exists) {
          throw new Error('Document does not exist');
        }
        setData(doc.data());
        setError(null);
      } catch (err: any) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoc();
    }
  }, [collection, id]);

  return { data, error, loading };
};
