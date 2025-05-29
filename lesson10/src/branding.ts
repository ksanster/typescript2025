declare const MeterSymbol: unique symbol;
type DistanceInMeter = number & {[MeterSymbol]:void};

function m(value:number):DistanceInMeter {
    return value as DistanceInMeter;
}

// Но как на это делать guards? Если по сути это все равно number и фабрика ничего не добавляет в него?
// Просто исходя из здравого смысла? И любое положительное число может быть метрами?
function isMeter(value:number):value is DistanceInMeter {
    return value >= 0;
}

function setDistance(value:DistanceInMeter | number):void {
    if (isMeter(value)) {
        console.log(`Distance is ${value + 0} meters`);
    } else {
        console.log(`Distance is ${value + 0}, but not in meters`);
    }
}

setDistance(m(10));
setDistance(-12);

