using Budget.TwilightSaw.Factory;

var app = HostFactory.CreateWebApplication(args);

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("_myAllowSpecificOrigins");

app.UseRouting();
app.UseAuthorization();
app.MapControllers();


app.MapFallbackToFile("index.html");
app.Run();