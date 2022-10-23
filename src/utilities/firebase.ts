// functions for firebase.
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { CORRECTIONS, DOCUMENTS, FIELDS, ScoreListType } from "./firebaseConfig";
import lang from '../utilities/lang';

import type { Firestore } from 'firebase/firestore/lite';
import type { GameModeType } from "./gameSetting";
import type { ScoreObj } from './firebaseConfig';
import type { DifficultTabKeys } from '../utilities/lang';



// Sort array<ScoreObj> by score
const sortByScore = (
    (
        { isAsc = true },
        prev: ScoreObj,
        curr: ScoreObj
    ) => {
        return isAsc
            ? prev.score - curr.score
            : curr.score - prev.score;
    }
);

// Get a list of cities from your database.
const getScores = async (db: Firestore) => {
    const scoresCol = collection(db, CORRECTIONS.SCORES);
    return getDocs(scoresCol)
        .then(scoresSnapshot => {
            const scioresList: Array<ScoreListType> = scoresSnapshot.docs.map(doc => ({
                scoreList: doc.data()[FIELDS.SCORES].sort(sortByScore.bind(null, { isAsc: true })),
                difficulty: lang.DIFFICULTY_TAB[doc.id as DifficultTabKeys].label,
                orderNum: lang.DIFFICULTY_TAB[doc.id as DifficultTabKeys].orderNum
            })).sort((a, b) => a.orderNum - b.orderNum);
            return scioresList;
        }).catch(err => err);
};

type PostScores = (
    db: Firestore,
    postObj: {
        username: string,
        score: number,
        difficulty: GameModeType;
    }) => Promise<any>;

// Post a score to firestore.
const postScores: PostScores = async (db, postObj) => {

    const { username, score, difficulty } = postObj;

    // Path to the target document
    const docRef = doc(
        db,
        CORRECTIONS.SCORES,
        DOCUMENTS[difficulty.toUpperCase()]
    );

    return updateDoc(docRef, {
        [FIELDS.SCORES]: arrayUnion({
            username,
            score
        })
    });
};

export {
    getScores,
    postScores
};