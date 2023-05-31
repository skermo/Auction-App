package com.internship.auctionapp.helpers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.InputStream;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageToUpload {
    private InputStream inputStream;
    private String path;
    private String fileName;
    private String contentType;
}
