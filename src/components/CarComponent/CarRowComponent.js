import React from 'react';
import {Link} from 'react-router-dom';


class CarRowComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            car:''
        }
    }

    componentDidMount() {
        this.setState({car: this.props.car})
        // console.log(this.props.car);
    }

    render(){
        return (
            <tr>

                <td>
                    {this.props.car.make}
                </td>
                <td>
                    <span className="">
                        {this.props.car.model}
                    </span>
                </td>
                <td>
                    <span className="">
                        {this.props.car.year}
                    </span>
                </td>
                <td>
                    <Link to={`/details/${this.props.car.id}`}>Details</Link>
                    {/*{console.log("car: " + this.props.car)}*/}
                </td>
            </tr>
        )
    }

}


export default (CarRowComponent)
