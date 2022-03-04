import Svg, { Path, Rect } from "react-native-svg";
import React from 'react';


const paths = {
    search: [
        "M6.79669 11.7188C9.51497 11.7188 11.7186 9.51515 11.7186 6.79688C11.7186 4.0786 9.51497 1.875 6.79669 1.875C4.07842 1.875 1.87482 4.0786 1.87482 6.79688C1.87482 9.51515 4.07842 11.7188 6.79669 11.7188Z",
        "M10.2768 10.2773L13.1245 13.125"
    ],
    store: [
        "M5.25 15.2675V22.75C5.25 22.9821 5.34219 23.2046 5.50628 23.3687C5.67038 23.5328 5.89294 23.625 6.125 23.625H21.875C22.1071 23.625 22.3296 23.5328 22.4937 23.3687C22.6578 23.2046 22.75 22.9821 22.75 22.75V15.2676",
        "M5.91001 4.375H22.09C22.2801 4.375 22.4651 4.43694 22.6169 4.55145C22.7687 4.66595 22.8791 4.82679 22.9313 5.00962L24.5 10.5H3.5L5.06868 5.00962C5.12092 4.82679 5.23129 4.66595 5.38309 4.55145C5.5349 4.43694 5.71987 4.375 5.91001 4.375Z",
        "M10.5 10.5V12.25C10.5 13.1783 10.1313 14.0685 9.47487 14.7249C8.8185 15.3813 7.92826 15.75 7 15.75C6.07174 15.75 5.1815 15.3813 4.52513 14.7249C3.86875 14.0685 3.5 13.1783 3.5 12.25V10.5",
        "M17.5 10.5V12.25C17.5 13.1783 17.1313 14.0685 16.4749 14.7249C15.8185 15.3813 14.9283 15.75 14 15.75C13.0717 15.75 12.1815 15.3813 11.5251 14.7249C10.8687 14.0685 10.5 13.1783 10.5 12.25V10.5",
        "M24.5 10.5V12.25C24.5 13.1783 24.1313 14.0685 23.4749 14.7249C22.8185 15.3813 21.9283 15.75 21 15.75C20.0717 15.75 19.1815 15.3813 18.5251 14.7249C17.8687 14.0685 17.5 13.1783 17.5 12.25V10.5"
    ],
    return: [
        "M28.125 53.4375L11.25 36.5625L28.125 19.6875",
        "M78.75 70.3125C78.75 61.3614 75.1942 52.777 68.8649 46.4476C62.5355 40.1183 53.9511 36.5625 45 36.5625H11.25"
    ],
    close: [
        "M15 75L75 15",
        "M75 75L15 15"
    ],
    eye: [
        "M45 20C17 20 6 45 6 45s11 25 39 25 39-25 39-25-11-25-39-25Z",
        "M45 56a11 11 0 1 0 0-22 11 11 0 0 0 0 22Z"
    ],
    closedEye: "m17 14 56 62M26 24C12 31 6 45 6 45a44 44 0 0 0 58 21m11-8c7-7 9-13 9-13S73 20 45 20h-4",
};

export default function Icon ({name, width, height, color, style}: {name: string, width: number, height: number, color: string, style?: any}) {
    if(name == "search") {
        return (
            <Svg width={width} height={height} viewBox="0 0 15 15" style={style}>
              <Path d={paths.search[0]} stroke={color} strokeWidth={1.5}/>
              <Path d={paths.search[1]} stroke={color} strokeWidth={1.5}/>
            </Svg>
        )
    }
    else if(name == "store") {
        return (
            <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
              <Path d={paths.store[0]} stroke={color} strokeWidth={2}/>
              <Path d={paths.store[1]} stroke={color} strokeWidth={2}/>
              <Path d={paths.store[2]} stroke={color} strokeWidth={2}/>
              <Path d={paths.store[3]} stroke={color} strokeWidth={2}/>
              <Path d={paths.store[4]} stroke={color} strokeWidth={2}/>
            </Svg>
        )
    }
    else if(name == "logo") {
        return (
            <Svg width={width} height={height} viewBox="0 0 27 26" style={style}>
                <Rect x="21.6" width="5.4" height="25.2" fill={color}/>
                <Rect x="10.8" width="5.4" height="25.2" fill={color}/>
                <Rect width="5.4" height="25.2" fill={color}/>
            </Svg>
        )
    }
    else if (name == "return") {
        return (
            <Svg width={width} height={height} viewBox="0 0 90 90" style={style}>
                <Path d={paths.return[0]} stroke={color} strokeWidth={9}/>
                <Path d={paths.return[1]} stroke={color} strokeWidth={9}/>
            </Svg>
        )
    }
    else if (name == "close") {
        return (
            <Svg width={width} height={height} viewBox="0 0 90 90" style={style}>
                <Path d={paths.close[0]} strokeWidth={12} stroke={color} />
                <Path d={paths.close[1]} strokeWidth={12} stroke={color} />
            </Svg>
        )
    }
    else if (name == "eye") {
        return (
            <Svg width={width} height={height} viewBox="0 0 90 90" style={style}>
                <Path d={paths.eye[0]} strokeWidth={7} stroke={color} />
                <Path d={paths.eye[1]} strokeWidth={7} stroke={color} />
            </Svg>
        )
    }
    else if (name == "closedEye") {
        return (
            <Svg width={width} height={height} viewBox="0 0 90 90" style={style}>
                <Path d={paths.closedEye} strokeWidth={7} stroke={color} />
            </Svg>
        )
    }
    return null
}