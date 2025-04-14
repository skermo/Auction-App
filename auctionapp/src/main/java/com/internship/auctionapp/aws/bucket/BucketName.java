package com.internship.auctionapp.aws.bucket;

public enum BucketName {
    AUCTION_APP_IMAGES("auction-app-atlantbh-semrakermo");
    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
