
import listClubs from '../lib/clubsActions/listClubs.js';



export default function ClubsList() {

    async function fetchClubs() {
        const pollClub = await getClubVote();
        const clubs = await listClubs();

        setPollClub(pollClub.reduce((acc, vote) => {
            acc[vote.clubId] = (acc[vote.clubId] || 0) + vote.vote;
            console.log("acc", acc);
            return acc;
        }, {}));

        setClubs(clubs);
    }

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <>
            {clubs.map((club) => {
                return (
                    <div className="flex">
                        <motion.div key={club.id} className="flex flex-col items-center justify-center w-64 h-64 p-8 m-4 bg-white rounded-lg shadow-lg dark:bg-neutral-800/100"
                            onClick={() => setSelectedId(club.id)}
                        >
                            <motion.h5>{club.name}</motion.h5>
                            <motion.h2>{club.website}</motion.h2>
                        </motion.div>
                        <div className="flex flex-col justify-center">
                            <button
                                disabled={disabledClubs[club.id]}
                                onClick={() => handlePullUp(club.id)}
                            >

                                <FeatherIcon icon="arrow-up" className="W-3" />

                            </button>
                            <span className="m-2">
                                {pollClub[club.id] || 0}
                            </span>
                            <button
                                disabled={disabledClubs[club.id]}
                                onClick={() => handlePullDown(club.id)}
                            >
                                <FeatherIcon icon="arrow-down" className="W-3" />
                            </button>
                        </div>
                    </div>
                );
            })}

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        layoutId={selectedId}
                        //animation popup
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-30"
                    >
                        <motion.h5>{clubs.find(club => club.id === selectedId).name}</motion.h5>
                        <motion.h2>{clubs.find(club => club.id === selectedId).website}</motion.h2>
                        <motion.button
                            className="absolute top-4 right-4 m-4 p-4 text-white bg-black rounded-lg dark:bg-neutral-800/100 dark:text-neutral-100"
                            onClick={() => setSelectedId(null)}>Close</motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>



    )

}