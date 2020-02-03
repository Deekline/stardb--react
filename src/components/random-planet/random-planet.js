import React, {useEffect, useState} from 'react';
import SwapiService from "../../services/swapi-service";

import './random-planet.css';

export const RandomPlanet = () => {

    const swapiService = new SwapiService();

    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [population, setPopulation] = useState(null);
    const [rotationPeriod, setRotationPeriod] = useState(null);
    const [diameter, setDiameter] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const id = Math.floor(Math.random() * 20) + 2;
        swapiService
            .getPlanet(id)
            .then((planet) => {
                setId(planet.id);
                setName(planet.name);
                setPopulation(planet.population);
                setRotationPeriod(planet.rotationPeriod);
                setDiameter(planet.diameter);
                setLoaded(true);
            });
    }, []);

    return (
        <div className="random-planet jumbotron rounded">
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt=''/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
