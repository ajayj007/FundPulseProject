package com.fundpulse.app.service;

import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;

@Service
public class DocumentUploadConfig {

    private static final String APPLICATION_NAME = "FundPulseApp";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    public Drive getDriveInstance() throws IOException {
        HttpTransport httpTransport = new NetHttpTransport();

        // Load the file as a classpath resource
        ClassPathResource resource = new ClassPathResource("google-drive.json");
        InputStream inputStream = resource.getInputStream();

        GoogleCredentials credentials = GoogleCredentials.fromStream(inputStream)
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        return new Drive.Builder(httpTransport, JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                .setApplicationName(APPLICATION_NAME)
                .build();
    }
}
