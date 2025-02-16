
package com.fundpulse.app.service;
/* 
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@Service
public class DocumentUploadService {

   @Autowired
   private Cloudinary cloudinary;

   public String uploadFile(MultipartFile file) {
       try {
           Map<String, Object> uploadResult = cloudinary.uploader().upload(
                   file.getBytes(),
                   ObjectUtils.asMap("resource_type", "raw") // ✅ Ensure PDFs are stored correctly
           );

           return uploadResult.get("secure_url").toString(); // ✅ Use HTTPS secure URL

       } catch (IOException e) {
           throw new RuntimeException("File upload failed: " + e.getMessage(), e);
       }
   }
} */
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.http.HttpCredentialsAdapter;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collections;

@Service
public class DocumentUploadService {

    private static final String APPLICATION_NAME = "FundPulseApp";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String CREDENTIALS_FILE_PATH = "src/main/resources/google-drive.json";

    public Drive getDriveInstance() throws IOException {
        HttpTransport httpTransport = new NetHttpTransport();
        
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(CREDENTIALS_FILE_PATH))
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        return new Drive.Builder(httpTransport, JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                .setApplicationName(APPLICATION_NAME)
                .build();
    }
}
