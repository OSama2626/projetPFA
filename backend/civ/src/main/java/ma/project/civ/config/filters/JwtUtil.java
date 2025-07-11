package ma.project.civ.config.filters;

public class JwtUtil {
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SECRET = "HoussamYounes";
    public static final long EXPIRATION_ACCESS_TOKEN = 10 * 60 * 1000;
    public static final long EXPIRATION_REFRESH_TOKEN = 30 * 60 * 1000;

}
