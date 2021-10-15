import React, { useEffect, useState } from 'react'
import MatchPreview from './MatchPreview'

function MatchList() {

    const [matchList, setMatchList] = useState(null);

    const getMatches = async () => {
        const matches = await (await fetch("https://api.opendota.com/api/proMatches")).json();
        setMatchList(matches);
    }

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <div>
            {matchList ? matchList.map((match) => { return <MatchPreview key={match.match_id} matchId={match.match_id} radiantTeam={match.radiant_name} direTeam={match.dire_name} /> }) : <p className="loading">Loading...</p>}
        </div>
    )
}

export default MatchList
