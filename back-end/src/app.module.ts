import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from "./config/config";
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret')
      }),
      global: true,
      inject: [ConfigService]
    }),
    /*  JwtModule  ====>
     * Async Registration:
        JwtModule.registerAsync({...}) allows you to register the JWT module asynchronously.
        This means that the JWT module will wait for any asynchronous operations (like fetching configuration) to complete before it is fully set up.
  
     * Dependency on ConfigModule:
        By including ConfigModule in the imports array, you ensure that the JWT module can access the configuration values defined in ConfigModule.
        The JWT module will not be initialized until the configuration is ready.
      
     * useFactory Function:
        The useFactory function is an asynchronous function that retrieves the secret key from the ConfigService. This function's role is to fetch the necessary configuration data and return an object with the JWT settings, specifically the secret key.
        It acts like a service in that it performs a task (fetching configuration) and returns the result needed to configure the JWT module.
     
     * Global Scope:
        Setting global: true means that the configured JWT module will be available throughout the entire application, eliminating the need to import it in every individual module where you want to use it.
        
     * Injecting ConfigService:
        The inject: [ConfigService] array ensures that the ConfigService is provided to the useFactory function.
        This is crucial for accessing the configuration values without running into errors.
        It guarantees that the ConfigService is instantiated and ready to be used when useFactory is called.
     */
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: async (config) => ({
          uri: config.get('database.connectionString')
        }),
        inject: [ConfigService]
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
