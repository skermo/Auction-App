package com.internship.auctionapp.aws;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

@Service
public class FileStore {
    private static final Logger LOGGER = LoggerFactory.getLogger(FileStore.class);
    private final AmazonS3 s3;

    public FileStore(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void save(String path,
                     String fileName,
                     Optional<Map<String, String>> optionalMetaData,
                     InputStream inputStream) {
        ObjectMetadata metadata = new ObjectMetadata();
        optionalMetaData.ifPresent(map -> {
            if (!map.isEmpty()) {
                map.forEach(metadata::addUserMetadata);
            }
        });
        try {
            s3.putObject(path, fileName, inputStream, metadata);
            LOGGER.info("Successfully uploaded file " + fileName + " to s3.");
        } catch (AmazonServiceException e) {
            LOGGER.error("Failed to upload file " + fileName + " to s3");
            throw new IllegalStateException("Failed to store file to s3", e);
        }
    }

    public byte[] download(String path, String key) {
        try {
            S3Object object = s3.getObject(path, key);
            S3ObjectInputStream inputStream = object.getObjectContent();
            LOGGER.info("Successfully downloaded file from path" + path);
            return IOUtils.toByteArray(inputStream);
        } catch (AmazonServiceException | IOException e) {
            LOGGER.error("Failed to download file from path " + path);
            throw new IllegalStateException("Failed to download", e);
        }
    }
}
