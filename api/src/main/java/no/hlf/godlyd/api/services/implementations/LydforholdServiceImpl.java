package no.hlf.godlyd.api.services.implementations;

import no.hlf.godlyd.api.repository.LydforholdRepo;
import no.hlf.godlyd.api.repository.VurderingRepo;
import no.hlf.godlyd.api.services.LydforholdService;
import org.springframework.stereotype.Service;

@Service
public class LydforholdServiceImpl implements LydforholdService {

    private LydforholdRepo lydforholdRepo;

    public LydforholdServiceImpl(LydforholdRepo lydforholdRepo){
        this.lydforholdRepo = lydforholdRepo;
    }

}
