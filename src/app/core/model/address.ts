export interface Address {
    street?: any,
    suite?: any,
    city?: any,
    zipcode?: any,
    geo: LatLong
}

export interface LatLong {
    lat: any,
    long: any
}