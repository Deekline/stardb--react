import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";

import './random-planet.css';
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loaded: true,
        error: false
    };

    componentDidMount() {
        this.updateServer();
        this.interval = setInterval(this.updateServer, 5000)
    }

    onPlanetLoaded = ( planet ) => {
        this.setState( { planet } );
        this.setState( { loaded: false } );
    };

    onError = ( err ) => {
        this.setState( { error: true } );
        this.setState( { loaded: false } );
    };

    updateServer = () => {
        const id = Math.floor( Math.random() * 17 + 3 );
        this.swapiService
            .getPlanet( id )
            .then( this.onPlanetLoaded )
            .catch( this.onError );
    };

    render() {

        const { planet, loaded, error } = this.state;

        const hasData = !(loaded || error);

        const spinner = loaded ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={ planet }/> : null;
        const onError = error ? <ErrorIndicator/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                { onError }
                { spinner }
                { content }
            </div>
        );
    }
};

const PlanetView = ( { planet } ) => {

    const { id, name, population, rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={ `https://starwars-visualguide.com/assets/img/planets/${ id }.jpg` }
                 alt=''/>
            <div>
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{ population }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{ rotationPeriod }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{ diameter }</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};
