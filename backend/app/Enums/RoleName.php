<?php

namespace App\Enums;

enum RoleName: string
{
    case AUTHOR = "Author";
    case EDITOR = "Editor";
    case SUBSCRIBER = "Subscriber";
    case ADMINISTRATOR = "Administrator";
}
