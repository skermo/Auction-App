package com.internship.auctionapp.response;

import com.internship.auctionapp.dto.ItemDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
@NoArgsConstructor
public class ItemResponse {
    private Page<ItemDto> items;
    private String didYouMean;

    public ItemResponse(Page<ItemDto> items, String didYouMean) {
        this.items = items;
        this.didYouMean = didYouMean;
    }
}
