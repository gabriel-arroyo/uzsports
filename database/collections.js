import { collection, doc, query as fbQuery } from "firebase/firestore";
import { db } from "./firebase-config";
import {
  useFirestoreQueryData,
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
    this.mutation = this.mutater();
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
   * @param {Array} queryConstraints e.g. { limit(10), where("state", "==", "active" )}
   * @return {UseQueryResult<QuerySnapshot<DocumentData>, FirestoreError>}
   */
  query(...queryConstraints) {
    return useFirestoreQueryData(
      [this.name],
      firestoreQuery(this.name, ...queryConstraints),
      {
        idField: "id",
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
  insert(newDocument) {
    console.log("mutate");
    this.mutation.mutate(newDocument);
  }

  /**
   * Firebase Mutation
   * @param {bool} merge if the document is replaced or not
   * @return {UseMutationResult<DocumentReference<DocumentData>, FirestoreError, WithFieldValue<DocumentData>, unknown>}
   */
  mutater(merge = true) {
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
