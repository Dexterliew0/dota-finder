import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import MatchId from './MatchId'
import PlayerDetail from './PlayerDetail'
import TeamTitle from './TeamTitle'

function MatchDetail() {

    let { id } = useParams();

    const [matchData, setmatchData] = useState(null);
    const [radiantTeam, setRadiantTeam] = useState(null);
    const [direTeam, setDireTeam] = useState(null);
    const [heroIcons, setHeroIcons] = useState(null);

    const getMatchData = async () => {
        const data = await (await fetch(`https://api.opendota.com/api/matches/${id}`)).json();
        const radiant = data.players.slice(0, 5);
        const dire = data.players.slice(5);
        setRadiantTeam(radiant);
        setDireTeam(dire);
        setmatchData(data);
    }

    const getIcons = async () => {
        const data = await (await fetch("https://api.opendota.com/api/constants/heroes")).json();
        setHeroIcons(data);
    }

    const winningTeam = () => {
        if (matchData.radiant_win === true) {
            if (!matchData.radiant_team) {
                return "Radiant";
            } else {
                return matchData.radiant_team.name;
            }
        } else {
            if (!matchData.dire_team) {
                return "Dire";
            } else {
                return matchData.dire_team.name;
            }
        }
    }

    const formatDuration = () => {
        let minutes = (matchData.duration / 60).toFixed().toString();
        let seconds = (matchData.duration % 60).toFixed().toString();
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }
        const formattedDuration = minutes + ":" + seconds;
        return formattedDuration;
    }

    useEffect(() => {
        getMatchData();
        getIcons();
    }, []);

    return (

        matchData && heroIcons ?
            <div>
                <MatchId id={id} winningTeam={winningTeam} formatDuration={formatDuration} />
                <TeamTitle team="Radiant" />
                {radiantTeam.map((player) => {
                    return <PlayerDetail
                        key={player.player_slot}
                        hero_icon={heroIcons[player.hero_id].icon} 
                        kills={player.kills}
                        net_worth={player.net_worth} 
                        deaths={player.deaths} 
                        gold_per_min={player.gold_per_min} 
                        assists={player.assists} 
                        xp_per_min={player.xp_per_min} 
                        last_hits={player.last_hits} 
                        hero_damage={player.hero_damage} />
                })}
                <TeamTitle team="Dire" />
                {direTeam.map((player) => {
                    return <PlayerDetail
                        key={player.player_slot}
                        hero_id={player.hero_id} 
                        hero_icon={heroIcons[player.hero_id].icon} 
                        kills={player.kills}
                        net_worth={player.net_worth} 
                        deaths={player.deaths} 
                        gold_per_min={player.gold_per_min} 
                        assists={player.assists} 
                        xp_per_min={player.xp_per_min} 
                        last_hits={player.last_hits} 
                        hero_damage={player.hero_damage} />
                })}
            </div>
            :
            <p className="loading">Loading...</p>
    )
}

export default MatchDetail
