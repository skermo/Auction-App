package com.internship.auctionapp.aws.bucket;

public enum BucketName {
    AUCTION_APP_IMAGES("auction-app-atlantbh");
    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
