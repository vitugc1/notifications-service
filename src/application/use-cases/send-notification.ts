import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(
    private notificationsRepository: NotificationsRepository
  ){}

  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { category, recipientId, content} = request

    const notification = new Notification({
      content: new Content(content),
      recipientId,
      category
    })

    // Quando criar e preciso persistir no banco 
    await this.notificationsRepository.create(notification)

    return {
      notification
    }
  }
}