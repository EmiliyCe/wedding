import { OfferList, Service, ServiceListPerYear, Discount, DiscountedServices, DiscountListPerYear, Offer, SimpleService } from "./models";

export const getData = (): OfferList => {

    ///every year the same price
    var weddingSession = new Service("WeddingSession", 600);
    var blurayPackage = new Service("BlurayPackage", 300);
    var twoDayEvent = new Service("TwoDayEvent", 400);

    /// -- 2020
    var photography2020 = new Service("Photography", 1700);
    var videoRecording2020 = new Service("VideoRecording", 1700);

    var listIfServices2020 = new ServiceListPerYear();
    listIfServices2020.listOfServices = [photography2020, videoRecording2020, weddingSession, blurayPackage, twoDayEvent];

    //discounts
    var photographyVideoRecordingDiscount2020 = new Discount(1200, [new DiscountedServices([photography2020, videoRecording2020])]);
    var weddingSessionWithVideoRecording2020 = new Discount(300, [new DiscountedServices([weddingSession, videoRecording2020])], "weddingSessionDiscount");
    var weddingSessionWithPhotography2020 = new Discount(300, [new DiscountedServices([weddingSession, photography2020])], "weddingSessionDiscount");

    var listOfDiscounts2020 = new DiscountListPerYear();
    listOfDiscounts2020.listOfDiscounts = [photographyVideoRecordingDiscount2020, weddingSessionWithPhotography2020, weddingSessionWithVideoRecording2020];

    /// -- 2021
    var photography2021 = new Service("Photography", 1800);
    var videoRecording2021 = new Service("VideoRecording", 1800);

    var listIfServices2021 = new ServiceListPerYear();
    listIfServices2021.listOfServices = [photography2021, videoRecording2021, weddingSession, blurayPackage, twoDayEvent];

    var photographyVideoRecordingDiscount2021 = new Discount(1300, [new DiscountedServices([photography2021, videoRecording2021])]);
    var weddingSessionWithVideoRecording2021 = new Discount(300, [new DiscountedServices([weddingSession, videoRecording2021])], "weddingSessionDiscount");
    var weddingSessionWithPhotography2021 = new Discount(300, [new DiscountedServices([weddingSession, photography2021])], "weddingSessionDiscount");

    var listOfDiscounts2021 = new DiscountListPerYear();
    listOfDiscounts2021.listOfDiscounts = [photographyVideoRecordingDiscount2021, weddingSessionWithPhotography2021, weddingSessionWithVideoRecording2021];

    /// -- 2022
    var photography2022 = new Service("Photography", 1900);
    var videoRecording2022 = new Service("VideoRecording", 1900);

    var listIfServices2022 = new ServiceListPerYear();
    listIfServices2022.listOfServices = [photography2022, videoRecording2022, weddingSession, blurayPackage, twoDayEvent];

    var photographyVideoRecordingDiscount2022 = new Discount(1300, [new DiscountedServices([photography2022, videoRecording2022])]);

    var weddingSessionWithVideoRecording2022 = new Discount(300, [new DiscountedServices([weddingSession, videoRecording2022])], "weddingSessionDiscount");

    var weddingSessionWithPhotography2022 = new Discount(600, [new DiscountedServices([weddingSession, photography2022])], "weddingSessionDiscount");

    var listOfDiscounts2022 = new DiscountListPerYear();
    listOfDiscounts2022.listOfDiscounts = [photographyVideoRecordingDiscount2022, weddingSessionWithPhotography2022, weddingSessionWithVideoRecording2022];

    var offer2020 = new Offer();
    offer2020.discounts = listOfDiscounts2020;
    offer2020.year = 2020;
    offer2020.services = listIfServices2020;

    var offer2021 = new Offer();
    offer2021.discounts = listOfDiscounts2021;
    offer2021.year = 2021;
    offer2021.services = listIfServices2021;

    var offer2022 = new Offer();
    offer2022.discounts = listOfDiscounts2022;
    offer2022.year = 2022;
    offer2022.services = listIfServices2022;

    return new OfferList([offer2020, offer2021, offer2022]);
}

export const data = [
    new SimpleService(1, "Photography", []),
    new SimpleService(2, "VideoRecording", []),
    new SimpleService(3, "BlurayPackage", [2]),
    new SimpleService(4, "TwoDayEvent", [1, 2]),
    new SimpleService(5, "WeddingSession", [])
];