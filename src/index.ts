import { CalculatedPrice as CalculatedPrice, Offer, OfferList, ServiceType, ServiceYear, SimpleService } from "./models";
import { data, getData } from "./data";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {

    let selectedServices: SimpleService[] = previouslySelectedServices.map(service => { return data.find(m => m.serviceType === service) });
    let selectedService: SimpleService = data.find(m => m.serviceType === action.service);

    switch (action.type) {
        case 'Select':
            if(
                selectedServices.findIndex((m) => m.serviceType === action.service) ===
                -1 &&
                selectedService &&
                (selectedService.dependsOnIds.length === 0 ||
                    selectedService.dependsOnIds.some((r) =>
                        selectedServices.some((s) => s.id == r)
                    ))
            ) {
                selectedServices = [...selectedServices, data.find((m) => m.serviceType === action.service)];
            }

            return selectedServices.map(service => service.serviceType);

        case "Deselect":
            if (selectedService.dependsOnIds.length === 0) {
                const dependentService: SimpleService = selectedServices.find((m) =>
                    m.dependsOnIds.find((s) => s == selectedService.id)
                );
    
                if (dependentService) {
                    if (dependentService.dependsOnIds
                        .filter((m) => m != selectedService.id)
                        .filter((value) => selectedServices.map((m) => m.id).includes(value))
                        .length === 0) {
                        selectedServices = selectedServices.filter(
                            (elem) => elem.serviceType !== dependentService.serviceType
                        );
                    }
                }
            }
    
            selectedServices = selectedServices.filter(
                (elem) => elem.serviceType !== action.service
            );

            return selectedServices.map(service => service.serviceType);
    }
};

export const calculatePrice = (
    selectedServices: ServiceType[],
    selectedYear: ServiceYear): { basePrice: number, finalPrice: number } => {
    const data: OfferList = getData();
    var offer: Offer = data.findOfferByYear(selectedYear);
    if (offer === null) {
        return new CalculatedPrice();
    }

    return offer.calculatePrice(selectedServices);
};

export { ServiceYear, ServiceType };
