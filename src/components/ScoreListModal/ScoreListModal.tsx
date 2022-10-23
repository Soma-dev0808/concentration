import React, { useEffect } from 'react';
import Tabs from '../Tabs';
import ScoreList from '../ScoreList/ScoreList';

import type { CommonActionType } from '../../app/configureStore';
import type { ScoreListType, ScoreObj } from "../../utilities/firebaseConfig";
import './ScoreListModal.scss';
import NoWrapLoadingIndicator from '../NoWrapLoadingIndicator';

interface ScoreListProps {
    getUserScores: CommonActionType,
    toggleScoreListModal: CommonActionType,
    userScores: Array<ScoreListType>,
    isUserScoreFetching: boolean,
    userScoresError: any,
    isShowScoreListModal: boolean,
}

const ScoreListModal: React.FC<ScoreListProps> = ({
    getUserScores,
    toggleScoreListModal,
    userScores,
    isUserScoreFetching,
    userScoresError,
    isShowScoreListModal
}) => {
    const handleCloseModal = () => toggleScoreListModal();

    useEffect(() => {
        isShowScoreListModal && getUserScores();
    }, [isShowScoreListModal]);

    return (
        isShowScoreListModal
            ? <div className='score-modal-container'>
                < div className='score-modal-modal'>

                    {userScoresError && <FetchScoreListError />}

                    {!isUserScoreFetching && userScores.length
                        ? (
                            <Tabs>
                                {
                                    userScores.map((score, idx) =>
                                        <ScoreList
                                            key={score.difficulty + idx}
                                            label={score.difficulty}
                                            scoreList={score.scoreList}
                                        />)
                                }
                            </Tabs>
                        )
                        : <NoWrapLoadingIndicator isCentred />
                    }

                    <button
                        onClick={handleCloseModal}
                        className="score-modal-close-button"
                    >
                        Close
                    </button>
                </div>
            </div >
            : null
    );
};

const FetchScoreListError = () => {
    return <div className='score-modal-error'>There's something problem with retrieving data. <br /> PLease try again. </div>;
};

export default ScoreListModal;