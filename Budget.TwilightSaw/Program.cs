using Budget.TwilightSaw.Factory;

var app = HostFactory.CreateWebApplication(args);

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();


app.MapFallbackToFile("index.html");
app.Run();