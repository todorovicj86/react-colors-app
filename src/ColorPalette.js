import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ColorBox from './ColorBox'
import PaletteNavbar from './PaletteNavbar'
import Footer from './Footer'
import {getPaletteShades} from './helpers'
import styles from './styles/PaletteStyles';

class ColorPalette extends Component {
    static defaultProps = {
        showingFullPalette: true,
    }
    constructor(props){
        super(props);
        this.state = {
            shadeLevel: 500,

        }
        this.changeShade = this.changeShade.bind(this)
    }

    changeShade(shadeLevel){
        this.setState({
            shadeLevel: shadeLevel
        })
    }

    render(){

        const {palette, format, sliderMarks,handleFormat, classes, showingFullPalette} = this.props;
        const {shadeLevel} = this.state;
        const colorBoxes = palette.colors[shadeLevel].map (color => (
            <ColorBox 
                bgColor = {color[format]}
                colorName = {color.name}
                key={color.name}
                format = {format}
                paletteId = {palette.id}
                id={color.id}
                showingFullPalette={showingFullPalette}
            />
        ))
          
          getPaletteShades(palette)
        return (
            <div className={classes.colorPalette}>
                <div className={classes.header}>
                    <PaletteNavbar 
                        handleFormat = {handleFormat} 
                        format = {format} 
                        marks = {sliderMarks}
                        changeShade = {this.changeShade}
                        hiddenSlider = {false}
                        showingFullPalette={showingFullPalette}
                    />

                    <div className={classes.link}>
                         <Button>
                            <Link className= {classes.linkBack} id="LinkBackTo" to = "/"><i className="fas fa-arrow-left"></i> Go back</Link>
                        </Button>
                    </div>
                </div>
                <div className={classes.colorBoxesContainer}>
                    {colorBoxes}
                </div>

                <Footer {...palette} showingFullPalette={!showingFullPalette}/>
    
            </div>
        )
    }
}

export default withStyles(styles)(ColorPalette);