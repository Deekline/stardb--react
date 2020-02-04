import React, { Component } from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemList extends Component {

    swapiService = new SwapiService();


    state = {
        peopleList: null,
        loaded: null,
        error: null,
    };

    onPeopleLoaded = ( peopleList ) => {
        this.setState( {
            peopleList
        } );
        this.setState( {
            loaded: false
        } );
    };

    onError = ( err ) => {
        this.setState( {
            error: true
        } );
        this.setState( {
            loaded: false
        } );
    };

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then(this.onPeopleLoaded)
            .catch( this.onError );
    }

    renderItems = ( arr ) => {
        return arr.map( ( { id, name } ) => {
            return (
                <li className="list-group-item"
                    key={ id }
                    onClick={ () => this.props.onItemSelected( id ) }>
                    { name }
                </li>
            );
        } );
    };

    render() {

        const { peopleList } = this.state;

        if ( !peopleList ) {
            return <Spinner/>;
        }

        const item = this.renderItems (peopleList);
        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        );
    }
}
