import { collection, doc, query as fbQuery } from "firebase/firestore";
import { firestore } from "./firebase";
import {
  useFirestoreQueryData,
  useFirestoreDocument,
  useFirestoreCollectionMutation,
  useFirestoreDocumentDeletion,
} from "@react-query-firebase/firestore";

const firestoreQuery = (name, ...queryConstraints) =>
  fbQuery(collection(firestore, name), ...queryConstraints);

/**
 * Template class for all firebase functions
 */
export class Collection {
  /**
   * @param {string} name Name of the firebase collection
   */
  constructor(name) {
    this.name = name;
    this.collection = collection(firestore, name);
    this.mutation = this.mutater();
  }

  /**
   * Firebase Document
   * @param {string} id Firebase Document ID value
   * @param {bool} depenency enables de query
   * @return {UseQueryResult<DocumentSnapshot<DocumentData>>}
   */
  document(id, depenency = true) {
    // const collectionRef = collection(firestore, this.name);
    const ref = doc(this.collection);
    const document = useFirestoreDocument([this.name, id], ref, {
      enabled: depenency,
    });
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
   * @param {id} id id of the document to update
   * @param {bool} merge if the document is replaced or not
   * @return {UseMutationResult<DocumentReference<DocumentData>, FirestoreError, WithFieldValue<DocumentData>, unknown>}
   */
  mutater(id, merge = true) {
    console.log(id);
    const ref = doc(this.collection, id);
    return useFirestoreCollectionMutation(ref, { merge: merge });
  }

  /**
   * Delete Document
   * @param {string} id ID of the document to delete
   * @return {UseMutationResult<void, FirestoreError, void, unknown>}
   */
  deleteMutation(id) {
    console.log(id);
    const coll = collection(firestore, this.name);
    const ref = doc(coll, id);
    const mutation = useFirestoreDocumentDeletion(ref);
    return mutation;
  }
}
