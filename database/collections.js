import { collection, doc, query as fbQuery } from "firebase/firestore";
import { db } from "./firebase-config";
import {
  useFirestoreQuery,
  useFirestoreDocument,
  useFirestoreCollectionMutation,
  useFirestoreDocumentDeletion,
} from "@react-query-firebase/firestore";

const firestoreQuery = (name, ...queryConstraints) =>
  fbQuery(collection(db, name), ...queryConstraints);

/**
 * Template class for all firebase functions
 */
export class Collection {
  /**
   * @param {string} name Name of the firebase collection
   */
  constructor(name) {
    this.name = name;
    this.collection = collection(db, name);
  }

  /**
   * Firebase Document
   * @param {string} id Firebase Document ID value
   * @return {UseQueryResult<DocumentSnapshot<DocumentData>>}
   */
  document(id) {
    // const collectionRef = collection(db, this.name);
    const ref = doc(this.collection, id);
    const document = useFirestoreDocument([this.name, id], ref);
    return document;
  }

  /**
   * Firebase Query
   * @return {UseQueryResult<QuerySnapshot<DocumentData>, FirestoreError>}
   */
  query(...queryConstraints) {
    return useFirestoreQuery(
      [this.name],
      firestoreQuery(this.name, ...queryConstraints),
      {
        subscribe: true,
      },
      {
        onSuccess: () => {
          console.log("query " + this.name + " successfully!");
        },
      }
    );
  }

  /**
   * Add document
   * @param {Object} newDocument object with properties
   */
  add(newDocument) {
    addDocument(this.collection, newDocument);
    console.log("mutate");
  }

  /**
   * Firebase Mutation
   * @param {bool} merge if the document is replaced or not
   * @return {UseMutationResult<DocumentReference<DocumentData>, FirestoreError, WithFieldValue<DocumentData>, unknown>}
   */
  mutation(merge = true) {
    return useFirestoreCollectionMutation(this.collection, { merge: merge });
  }

  /**
   * Delete Document
   * @param {string} id ID of the document to delete
   * @return {UseMutationResult<void, FirestoreError, void, unknown>}
   */
  deleteMutation(id) {
    console.log(id);
    const coll = collection(db, this.name);
    const ref = doc(coll, id);
    const mutation = useFirestoreDocumentDeletion(ref);
    return mutation;
  }
}
