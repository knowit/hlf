package no.hlf.godlyd.api.controller;

import no.hlf.godlyd.api.GodLydApplication;
import no.hlf.godlyd.api.Gruppe;
import no.hlf.godlyd.api.model.Tag;
import no.hlf.godlyd.api.services.TagService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@SpringBootTest(classes = GodLydApplication.class)
@ExtendWith(SpringExtension.class)
//@ContextConfiguration(classes=GodLydApplication.class)
@WebMvcTest(TagController.class)
public class TagControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private TagService tagService;

/*
    @Test
    public void getAllTagsC() throws Exception {
        Tag tag = new Tag("airport", Gruppe.GRUPPE1);
        List<Tag> allTags = Arrays.asList(tag);

        Mockito.when(tagService.getAllTags()).thenReturn(allTags);

        mvc.perform(get("/tags")
                .contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                //.andExpect(jsonPath("$[0].id", is(tag.getId())))
                .andExpect(jsonPath("$[0].navn", is("airport")));
                //.andExpect(jsonPath("$[0].gruppe", is("GRUPPE1")));
        //verify(tagService, times(1)).getAllTags();
        //verifyNoMoreInteractions(tagService);

    }*/

}
