package de.gaz.eedu.upload;

import de.gaz.eedu.upload.file.FileService;
import de.gaz.eedu.user.UserService;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequiredArgsConstructor @RequestMapping("/api/v1/repo/")
public class RepositoryController
{
    private final @NotNull RepositoryService repositoryService;
    private final @NotNull FileService fileService;
    private final @NotNull UserService userService;


}
