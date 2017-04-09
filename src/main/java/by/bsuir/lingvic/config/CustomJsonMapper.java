package by.bsuir.lingvic.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * Created by Вика on 09.04.2017.
 */
public class CustomJsonMapper extends ObjectMapper {
    public CustomJsonMapper() {
        this.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }
}
