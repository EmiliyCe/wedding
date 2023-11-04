export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

interface IService {
    name: ServiceType;
    price: number;
}

interface IServiceListPerYear {
    listOfServices: IService[];
}

interface IDiscount {
    value: number;
    discountedServices: IDiscountedServices[];
    type?: string | null;
}

interface IDiscountedServices {
    listOfServices: IService[];
}

interface IDiscountListPerYear {
    listOfDiscounts: IDiscount[];
    calculatePrice(selectedServices: IService[]): number;
}

interface IOffer {
    services: ServiceListPerYear;
    discounts: DiscountListPerYear;
    year: ServiceYear;

    calculatePrice(selectedServices: ServiceType[]): CalculatedPrice;
}

export class SimpleService {
    id: number;
    serviceType: ServiceType;
    dependsOnIds: number[];

    constructor(id: number, serviceType: ServiceType, dependsOnIds: number[]) {
        this.id = id;
        this.serviceType = serviceType;
        this.dependsOnIds = dependsOnIds;
    }
}

export class Service implements IService {

    constructor(name: ServiceType, price: number) {
        this.name = name;
        this.price = price;
    }

    name: ServiceType;
    price: number;
}

export class Discount implements IDiscount {
    value: number;
    discountedServices: IDiscountedServices[] = [];
    type?: string | null;

    constructor(value: number, discountedServices: IDiscountedServices[], type?: string | null) {
        this.value = value;
        this.discountedServices = discountedServices;
        this.type = type;
    }
}

export class ServiceListPerYear implements IServiceListPerYear {
    listOfServices: IService[];
}

export class DiscountedServices implements IDiscountedServices {
    listOfServices: IService[] = [];

    constructor(listOfServices: IService[]) {
        this.listOfServices = listOfServices;
    }

}

export class DiscountListPerYear implements IDiscountListPerYear {
    listOfDiscounts: IDiscount[];

    calculatePrice(selectedServices: IService[]): number {

        let price: number = 0;

        if (selectedServices.length <= 1) {
            return price;
        }

        var possibleDiscounts: IDiscount[] = [];
        this.listOfDiscounts.forEach(discount => {
            discount.discountedServices.forEach(item => {
                var areEqual = item.listOfServices.every(service => selectedServices.find(m => m.name === service.name))
                if (areEqual) {
                    possibleDiscounts = [...possibleDiscounts, discount]
                }
            });
        });

        const groupedByDiscountType = possibleDiscounts.reduce((group: { [key: string]: IDiscount[] }, item) => {
            if (!group[item.type]) {
                group[item.type] = [];
            }
            group[item.type].push(item);
            return group;
        }, {});

        Object.keys(groupedByDiscountType).forEach((group) => {
            let discountedServicesList: IDiscount[] = groupedByDiscountType[group];
            if (group !== 'undefined') {
                let max: number = Math.max(...discountedServicesList.map(m => m.value));
                price = max + price;
            } else {
                price = + discountedServicesList.map(m => m.value).reduce((partialSum, element) => partialSum + element, 0);
            }
        })

        return price;
    }
}

export class Offer implements IOffer {

    services: ServiceListPerYear;
    discounts: DiscountListPerYear;
    year: ServiceYear;

    calculatePrice(selectedServices: ServiceType[]): CalculatedPrice {

        let response = new CalculatedPrice();

        if (selectedServices.length === 0) {
            return response;
        }

        else if (selectedServices.length === 1) {
            const price = this.services.listOfServices.find(m => m.name === selectedServices[0])?.price || 0;
            response.basePrice = response.finalPrice = price;
        }

        else {
            let listOfSelectedServices: IService[] = this.services.listOfServices.filter(service => selectedServices.includes(service.name));
            let basePrice = 0;
            let finalPrice = 0;

            basePrice = + listOfSelectedServices.map(m => m.price).reduce((partialSum, element) => partialSum + element, 0);

            let discountPrice = this.discounts.calculatePrice(listOfSelectedServices);
            if (discountPrice === 0) {
                finalPrice = basePrice;
            } else {
                finalPrice = basePrice - discountPrice;
            }

            response.basePrice = basePrice;
            response.finalPrice = finalPrice;
        }

        return response
    }
}

export class OfferList {
    offers: IOffer[];

    constructor(offers: IOffer[]) {
        this.offers = offers;
    }

    findOfferByYear(selectedYear: number): Offer | null {
        return this.offers.find(m => m.year === selectedYear) || null;
    }
}

export class CalculatedPrice {
    basePrice: number = 0;
    finalPrice: number = 0;
}
