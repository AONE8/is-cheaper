package ua.andriimalyshko.backend.courses.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.andriimalyshko.backend.courses.bean.Course;

import java.util.Arrays;
import java.util.List;

@RestController
public class CourseController {
    @GetMapping("/courses")
    public List<Course> getAllCorses() {
        return Arrays.asList(new Course(1, "First course", "Some description"));
    }

}
